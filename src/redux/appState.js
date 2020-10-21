/**
 * Sample Redux State for the entire application.
 * @author Andrew Jarombek
 * @since 5/3/2020
 */

const appState = {
  auth: {
    auth: {
      isFetching: false,
      lastUpdated: 1588530309,
      signedInUser: 'andy',
      status: "SUCCESS"
    },
    user: {
      andy: {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: 1588530310,
        username: "andy",
        first: "Andrew",
        last: "Jarombek",
        password: "xxxxxx",
        description: "Test Description",
        memberSince: "2016-02-23 12:00:00",
        classYear: 2017,
        location: "New York, NY",
        favoriteEvent: "Cooldown Jog",
        activationCode: "ABCD1234",
        email: "andrew@jarombek.com",
        lastSignIn: "2020-05-03 12:00:00",
        subscribed: "Y",
        logs: []
      }
    },
    forgotPassword: {
      email: {
        isFetching: false,
        lastUpdated: 1588530309,
        status: "SUCCESS",
        serverError: null
      },
      reset: {
        isFetching: false,
        lastUpdated: 1588530310,
        status: undefined,
        serverError: undefined
      }
    }
  },
  registration: {
    stage: 1,
    first: "Andy",
    last: "Jarombek",
    email: "andrew@jarombek.com",
    username: undefined,
    password: undefined,
    activationCode: undefined,
    teams: {
      saintsXCTFAlumni: {
        status: "accepted",
        groups: {
          alumni: {
            status: "accepted"
          }
        }
      }
    }
  },
  memberships: {
    groups: {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1588530314,
      items: []
    }
  },
  notifications: {
    isFetching: false,
    didInvalidate: false,
    lastUpdated: 1588530314,
    items: [],
    creating: {
      isFetching: false,
      lastUpdated: 1588530314,
      created: true
    }
  },
  profile: {
    tom: {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1588530311,
      flair: {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: 1588530311,
        items: []
      }
    },
    joe: {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1588530312,
      flair: {}
    },
    ben: {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1588530313,
      flair: {}
    }
  },
  rangeView: {
    users: {
      joe: {
        'r': {
          '2020-08-31:2020-10-04': {
            isFetching: false,
            didInvalidate: false,
            lastUpdated: 1588530313,
            items: []
          }
        }
      }
    },
    groups: {},
  },
  group: {
    wmenstf: {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1588530314,
      groupName: "wmenstf",
      groupTitle: "Women's Track & Field",
      description: "",
      weekStart: "monday",
      members: [],
      logs: []
    }
  },
  logs: {
    isFetching: false,
    didInvalidate: false,
    lastUpdated: 1588530315,
    items: {
      1: {
        logId: 1,
        username: "andy",
        first: "Andrew",
        last: "Jarombek",
        name: "Reservoir Loop",
        location: "New York, NY",
        date: "2020-05-03",
        type: "run",
        distance: 6.37,
        metric: "miles",
        miles: 6.37,
        time: "00:45:37",
        pace: "00:07:10",
        feel: 6,
        description: "",
        timeCreated: "2020-05-03 12:00:00",
        comments: [
          {
            commentId: 1,
            username: "andy",
            first: "Andrew",
            last: "Jarombek",
            logId: 1,
            time: "2020-05-03 12:00:00",
            content: "test"
          }
        ]
      }
    },
    feeds: {
      "all-all": {
        filterBy: "all",
        bucket: "all",
        pages: {
          1: {
            isFetching: false,
            lastUpdated: 1588530315,
            items: [],
            serverError: null
          }
        }
      }
    },
    newLog: {
      isFetching: false,
      lastUpdated: 1588530315,
      created: true,
      serverError: null
    },
    updateLog: {
      3: {
        isFetching: false,
        lastUpdated: 1588530315,
        updated: true,
        serverError: null
      }
    },
    newComments: {
      3: {
        isFetching: false,
        lastUpdated: 1588530315,
        created: true,
        serverError: null
      }
    }
  }
};
