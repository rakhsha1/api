
module.exports = {
  'query': {
    'filtered': {
      'query': {
        'bool': {
          'must': [{
            'match': {
              'name.default': {
                'query': 'test',
                'boost': 1,
                'analyzer': 'peliasOneEdgeGram'
              }
            }
          }],
          'should': [{
            'match': {
              'phrase.default': {
                'query': 'test',
                'analyzer': 'peliasPhrase',
                'type': 'phrase',
                'boost': 1,
                'slop': 2
              }
            }
          }, {
            'function_score': {
              'query': {
                'match': {
                  'phrase.default': {
                    'analyzer': 'peliasPhrase',
                    'type': 'phrase',
                    'boost': 1,
                    'slop': 2,
                    'query': 'test'
                  }
                }
              },
              'functions': [{
                'linear': {
                  'center_point': {
                    'origin': {
                      'lat': 0,
                      'lon': 0
                    },
                    'offset': '1km',
                    'scale': '50km',
                    'decay': 0.5
                  }
                },
                'weight': 2
              }],
              'score_mode': 'avg',
              'boost_mode': 'replace'
            }
          },{
            'function_score': {
              'query': {
                'match': {
                  'phrase.default': {
                    'query': 'test',
                    'analyzer': 'peliasPhrase',
                    'type': 'phrase',
                    'slop': 2,
                    'boost': 1
                  }
                }
              },
              'max_boost': 20,
              'score_mode': 'first',
              'boost_mode': 'replace',
              'filter': {
                'exists': {
                  'field': 'popularity'
                }
              },
              'functions': [{
                'field_value_factor': {
                  'modifier': 'log1p',
                  'field': 'popularity'
                },
                'weight': 1
              }]
            }
          },{
            'function_score': {
              'query': {
                'match': {
                  'phrase.default': {
                    'query': 'test',
                    'analyzer': 'peliasPhrase',
                    'type': 'phrase',
                    'slop': 2,
                    'boost': 1
                  }
                }
              },
              'max_boost': 20,
              'score_mode': 'first',
              'boost_mode': 'replace',
              'filter': {
                'exists': {
                  'field': 'population'
                }
              },
              'functions': [{
                'field_value_factor': {
                  'modifier': 'log1p',
                  'field': 'population'
                },
                'weight': 2
              }]
            }
          }]
        }
      }
    }
  },
  'sort': [ '_score' ],
  'size': 10,
  'track_scores': true
};
