export default {
    title: 'Zilch task',
    sheets: {
        cardDetailsSheet: {
            title: 'Card details',
            labels: {
                expiryDate: 'Expiry date',
                cardNumber: 'Card number',
                cvv: 'CVV',
                cardholderName: 'Cardholder',
            },
        },
    },
    biometrics: {
        confirm: 'Confirm with biometrics',
        cancel: 'Cancel',
    },
    cardDetailsFlow: {
        cardPreviewScreen: {
            actions: {
                details: 'Card details',
                freeze: 'Freeze',
                unfreeze: 'Unfreeze',
                limits: 'Limits',
                settings: 'Settings',
            },
            sections: {
                transactions: {
                    title: 'Transactions',
                },
            },
            badges: {
                PENDING: 'Card pending',
                BLOCKED: 'Card blocked',
                FROZEN: 'Card frozen',
                EXPIRED: 'Card expired',
            },
            banners: {
                BLOCKED:
                    'This card is currently blocked. Please reach out to support or your administrator to resolve this and re-activate your card.',
                PENDING: "We're generating your card details. It'll be ready for use in just a moment.",
                EXPIRED: 'This card has expired. Please contact your bank to renew it.',
            },
            snackbars: {
                automaticClose: 'User cancelled auth',
            },
        },
    },
    cards: {
        enums: {
            types: {
                VIRTUAL: 'Virtual',
                PHYSICAL: 'Physical',
            },
        },
        validation: {
            cardNameRequired: 'Name is required',
            cardNameTooLong: 'Name must be {{ maxLength }} characters or less',
            cardNameInvalidCharacters: 'Name can contain only alphanumeric characters and {{validCharacters}}.',
        },
        labels: {
            issuer: {
                mastercard: 'Mastercard',
            },
        },
    },
} as const;
