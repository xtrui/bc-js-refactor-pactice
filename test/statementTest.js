const test = require('ava');
const {statement} = require('../src/statement');

test('Sample test', t => {
  t.true(true);
  t.is(1, 1);
  t.deepEqual({a: 1}, {a: 1});
});


test('no performances for tragedy test', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances': []
  };
  const plays = {
    'hamlet': {
      'name': 'Hamlet',
      'type': 'tragedy',
    },
  };
  const result = statement(invoice, plays);

  t.is(result,`Statement for BigCo
Amount owed is $0.00
You earned 0 credits 
`
  );
});
test('ge 30 audience for tragedy test', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances': [
      {
        'playID': 'hamlet',
        'audience': 30,
      },
    ]
  };
  const plays = {
    'hamlet': {
      'name': 'Hamlet',
      'type': 'tragedy',
    },
  };
  const result = statement(invoice, plays);

  t.is(result,`Statement for BigCo
 Hamlet: $400.00 (30 seats)
Amount owed is $400.00
You earned 0 credits 
`
  );
});
test('lt 30 ge 20  audience for tragedy test', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances': [
      {
        'playID': 'hamlet',
        'audience': 29,
      },
    ]
  };
  const plays = {
    'hamlet': {
      'name': 'Hamlet',
      'type': 'tragedy',
    },
  };
  const result = statement(invoice, plays);

  t.is(result,`Statement for BigCo
 Hamlet: $400.00 (29 seats)
Amount owed is $400.00
You earned 0 credits 
`
  );
});
test('no performances for comedy test', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances': []
  };
  const plays = {
    'hamlet': {
      'name': 'Hamlet',
      'type': 'tragedy',
    },
    'as-like': {
      'name': 'As You Like It',
      'type': 'comedy',
    },
  };
  const result = statement(invoice, plays);

  t.is(result,`Statement for BigCo
Amount owed is $0.00
You earned 0 credits 
`
  );
});
test('ge 30 audience for comedy test', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances': [
      {
        'playID': 'hamlet',
        'audience': 30,
      },
    ]
  };
  const plays = {
    'hamlet': {
      'name': 'Hamlet',
      'type': 'tragedy',
    },
  };
  const result = statement(invoice, plays);

  t.is(result,`Statement for BigCo
 Hamlet: $400.00 (30 seats)
Amount owed is $400.00
You earned 0 credits 
`
  );
});
test('lt 30 ge 20 audience for comedy test', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances': [
      {
        'playID': 'as-like',
        'audience': 29,
      },
    ]
  };
  const plays = {
    'hamlet': {
      'name': 'Hamlet',
      'type': 'tragedy',
    },
    'as-like': {
      'name': 'As You Like It',
      'type': 'comedy',
    },
  };
  const result = statement(invoice, plays);

  t.is(result,`Statement for BigCo
 As You Like It: $532.00 (29 seats)
Amount owed is $532.00
You earned 5 credits 
`
  );
});
test('wrong type test', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances': [
      {
        'playID': 'as-lik',
        'audience': 29,
      },
    ]
  };
  const plays = {
    'hamlet': {
      'name': 'Hamlet',
      'type': 'tragedy',
    },
    'as-lik': {
      'name': 'As You Like It',
      'type': 'come',
    },
  };
  try {
    statement(invoice,plays)
    t.fail();
  }catch (e) {
    t.is(e.message,'unknown type: come')
  }
});

const invoice = {
  'customer': 'BigCo',
  'performances': [
    {
      'playID': 'hamlet',
      'audience': 55,
    },
    {
      'playID': 'as-like',
      'audience': 35,
    },
    {
      'playID': 'othello',
      'audience': 40,
    },
  ],
};


const plays = {
  'hamlet': {
    'name': 'Hamlet',
    'type': 'tragedy',
  },
  'as-like': {
    'name': 'As You Like It',
    'type': 'comedy',
  },
  'othello': {
    'name': 'Othello',
    'type': 'tragedy',
  },
};