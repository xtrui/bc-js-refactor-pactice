function calculateCredits(volumeCredits, perf, play) {
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);
    return volumeCredits;
}

function createHtmlResult(result, format, totalAmount, volumeCredits) {
    result = '<h1>Statement for BigCo</h1>\n' +
        '<table>\n' +
        '<tr><th>play</th><th>seats</th><th>cost</th></tr>' +
        ' <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>\n' +
        ' <tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>\n' +
        ' <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>\n' +
        '</table>\n' +
        '<p>Amount owed is <em>$1,730.00</em></p>\n' +
        '<p>You earned <em>47</em> credits</p>\n'

    return "";
}

function getTotalAmount(plays, invoice) {
    let totalAmount = 0;

    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        let thisAmount = 0;
        thisAmount = calculateAmount(thisAmount, perf, play)
        totalAmount += thisAmount;
    }
    return totalAmount;
}

function getVolumeCredit(plays, invoice) {
    let volumeCredits = 0;
    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        volumeCredits = calculateCredits(volumeCredits, perf, play);
    }
    return volumeCredits;
}


function getStatementData(plays, invoice) {
    let statementData = [];
    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        let thisAmount = 0;
        thisAmount = calculateAmount(thisAmount, perf, play)
        statementData.push({name: play.name, amount: thisAmount, seats: perf.audience});
    }
    return statementData;
}

function getTextResult(invoice, statementData, totalAmount, volumeCredits) {
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format;
    for (let e of statementData) {
        result += ` ${e.name}: ${format(e.amount / 100)} (${e.seats} seats)\n`;
    }
    result += `Amount owed is ${format(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits \n`;
    return result;
}

function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let statementData = [];

    totalAmount = getTotalAmount(plays, invoice);
    volumeCredits = getVolumeCredit(plays, invoice);
    statementData = getStatementData(plays, invoice)

    let result = getTextResult(invoice, statementData, totalAmount, volumeCredits);
    return result;
}

function calculateAmount(thisAmount, perf, play) {
    if (play.type === 'tragedy') {
        thisAmount = calculateTragedyAmount(thisAmount, perf);
    } else if (play.type === 'comedy') {
        thisAmount = calculateComedyAmount(thisAmount, perf);
    } else {
        throw new Error(`unknown type: ${play.type}`);
    }
    return thisAmount;
}


function calculateTragedyAmount(thisAmount, perf) {
    thisAmount = 40000;
    if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
    }
    return thisAmount;
}

function calculateComedyAmount(thisAmount, perf) {
    thisAmount = 30000;
    if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20);
    }
    thisAmount += 300 * perf.audience;
    return thisAmount;
}

module.exports = {
    statement,
};
