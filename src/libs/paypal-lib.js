import paypal from 'paypal-rest-sdk';
const { PAYPAL_CLIENT_ID: id, PAYPAL_SECTRET_KEY: secret } = process.env;

paypal.configure({
    mode: 'sandbox', //sandbox or live
    client_id: id,
    client_secret: secret,
});

const create_payment_json = {
    intent: 'sale',
    payer: {
        payment_method: 'paypal',
    },
    redirect_urls: {
        return_url: '/bucket',
        cancel_url: '/bucket',
    },
    transactions: [
        {
            item_list: {
                items: [
                    {
                        name: 'item',
                        sku: 'item',
                        price: '1.00',
                        currency: 'USD',
                        quantity: 1,
                    },
                ],
            },
            amount: {
                currency: 'USD',
                total: '1.00',
            },
            description: 'This is the payment description.',
        },
    ],
};

paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
        throw error;
    } else {
        console.log('Create Payment Response');
        console.log(payment);
    }
});
