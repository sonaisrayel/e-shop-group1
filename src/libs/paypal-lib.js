import paypal from 'paypal-rest-sdk';
const { HOST, PORT, PAYPAL_CLIENT_ID: id, PAYPAL_SECTRET_KEY: secret } = process.env;

paypal.configure({
    mode: 'sandbox',
    client_id: id,
    client_secret: secret,
});

const pay = async (bucket) => {

    console.log(bucket,'bucket')

    const create_payment_json = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal',
        },
        redirect_urls: {
            "return_url": "http://return.url",
            "cancel_url": "http://cancel.url"
        },
        transactions: [
            {
                item_list: {
                    "items": [{
                        "name": 'SH100 WARM QUECHUA',
                        "price": "5.00",
                        "currency": "USD",
                        "quantity": 1
                    }],
                },
                amount: {
                    currency: 'USD',
                    total: 5.00,
                },
                description: 'New shoes',
            },
        ],
    };

    console.log(create_payment_json,'create_payment_json')

    paypal.payment.create(create_payment_json, (payment) => {
        try {
            // what is this for?

            console.log(JSON.stringify(payment,null,2),'payment')
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    console.log(payment.links[i].href)
                   // res.redirect(payment.links[i].href);
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

export  { pay, success };
