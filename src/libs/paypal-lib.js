import paypal from 'paypal-rest-sdk';
const { HOST, PORT, PAYPAL_CLIENT_ID: id, PAYPAL_SECTRET_KEY: secret } = process.env;

paypal.configure({
    mode: 'sandbox',
    client_id: id,
    client_secret: secret,
});

const pay = async (bucket) => {
    const create_payment_json = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal',
        },
        redirect_urls: {
            return_url: `${HOST}/${PORT}/bucket`,
            cancel_url: `${HOST}/${PORT}/bucket`,
        },
        transactions: [
            {
                item_list: {
                    items: bucket.products,
                },
                amount: {
                    currency: 'USD',
                    total: bucket.totalPrice,
                },
                description: 'This is the payment description.',
            },
        ],
    };

    paypal.payment.create(create_payment_json, (payment) => {
        try {
            // what is this for?
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        } catch (error) {
            throw error;
        }
    });
};

const success = async (PayerID, paymentId) => {
    const execute_payment_json = {
        payer_id: PayerID,
        transactions: [
            {
                amount: {
                    currency: 'USD',
                    total: '5.00',
                },
            },
        ],
    };

    paypal.payment.execute(paymentId, execute_payment_json, (payment) => {
        try {
            return payment.state;
        } catch (error) {
            throw error;
        }
    });
};

export default { pay, success };
