/**
 * Sample Redux State for the entire application.
 * @author Andrew Jarombek
 * @since 5/3/2020
 */

const appState = {
  auth: {
    signedIn: true
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
      member_since: "2016-02-23 12:00:00",
      class_year: 2017,
      location: "New York, NY",
      favorite_event: "Cooldown Jog",
      activation_code: "ABCD1234",
      email: "andrew@jarombek.com",
      last_signin: "2020-05-03 12:00:00",
      subscribed: "Y",
      logs: []
    }
  },
  profile: {
    tom: {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1588530311
    },
    joe: {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1588530312
    },
    ben: {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1588530313
    }
  },
  group: {
    wmenstf: {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1588530314,
      groupname: "wmenstf",
      group_title: "Women's Track & Field",
      description: "",
      week_start: "monday",
      members: [],
      logs: []
    }
  },
  logs: {
    isFetching: false,
    didInvalidate: false,
    lastUpdated: 1588530315,
    items: [
      {
        log_id: 1,
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
        time_created: "2020-05-03 12:00:00",
        comments: [
          {
            comment_id: 1,
            username: "andy",
            first: "Andrew",
            last: "Jarombek",
            log_id: 1,
            time: "2020-05-03 12:00:00",
            content: "test"
          }
        ]
      }
    ]
  }
};
