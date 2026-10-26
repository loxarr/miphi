const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

function ticketPrice(category) {
  switch (category) {
    case 1:
      return 300;
    case 2:
      return 500;
    case 3:
      return 900;
    default:
      return 0;
  }
}

function maxTickets(budget, price) {
  let tickets = 0;
  let moneyLeft = budget;

  while (moneyLeft >= price) {
    moneyLeft -= price;
    tickets += 1;
  }

  return tickets;
}

function printTicketResult(category, budget) {
  const price = ticketPrice(category);

  if (price === 0) {
    console.log('неизвестная категория');
    return;
  }

  const tickets = maxTickets(budget, price);
  console.log(
    `Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${tickets} шт.`,
  );
}

function deliveryPrice(distance, total) {
  if (total >= 3000 || distance <= 3) {
    return 0;
  }

  if (distance <= 10) {
    return 200;
  }

  return 200 + (distance - 10) * 25;
}

function printDelivery(distance, total) {
  const price = deliveryPrice(distance, total);
  console.log(
    `Расстояние ${distance} км, заказ ${total} руб.: доставка ${price} руб.`,
  );
}

function printSteps(height) {
  let builtSteps = 0;

  for (let step = 1; step <= height; step += 1) {
    if (step === 4) {
      continue;
    }

    console.log(`Ступень ${step}`);
    builtSteps += 1;

    if (step === 10) {
      console.log('Дальше лестница не построена');
      break;
    }
  }

  console.log(`Всего построено: ${builtSteps}`);
}

async function main() {
  console.log('Выберите задачу:');
  console.log('1 — билетная касса');
  console.log('2 — доставка заказа');
  console.log('3 — лестница');

  const choice = Number(await ask('Ваш выбор: '));

  if (choice === 1) {
    const category = Number(await ask('Категория билета: '));
    const budget = Number(await ask('Бюджет: '));
    printTicketResult(category, budget);
  } else if (choice === 2) {
    const distance = Number(await ask('Расстояние: '));
    const total = Number(await ask('Сумма заказа: '));
    printDelivery(distance, total);
  } else if (choice === 3) {
    const height = Number(await ask('Высота лестницы: '));
    printSteps(height);
  } else {
    console.log('такой задачи нет');
  }

  rl.close();
}

main();
