const nodemailer = require(`nodemailer`);

function generateOrderEmail({ order, total }) {
  return `<div>
  <h2>Your recent order for ${total}</h2>
  <p>Please come get your pizza.  It's almost ready!</p>
  <ul>
    ${order
      .map(
        (item) => `<li>
    <img src="${item.thumbnail}" alt="${item.name}" />
    ${item.size} ${item.name} - ${item.price}
    </li>`
      )
      .join('')}
  </ul>
  <p>Your total is ${total}</p>
  </div>
  `;
}

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

exports.handler = async (event, context) => {
  await wait(5000);
  const body = JSON.parse(event.body);
  // check to see if a robot has filled in the honeypot
  if (body.comeHereBees) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'You got stuck in the honey!' }),
    };
  }
  // validate the data coming in is correct
  const requireFields = ['email', 'name', 'order'];

  for (const field of requireFields) {
    console.log(`Checking that the ${field} is good`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! your are missing the ${field} field!`,
        }),
      };
    }
  }

  // make sure there are pizzas in the order.

  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Why would you order nothing? You will be hungry :(`,
      }),
    };
  }

  // send the email
  const info = await transporter.sendMail({
    from: 'Slicks Slices <slick@example.com>',
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
