const tokens = {
    color: {
        button: {
            primary: {
                text: {
                    default: '#0F1C03',
                    disabled: '#8A938C',
                },
                fill: {
                    default: '#75C92C',
                    active: '#95D65C',
                    selected: '#0F1C03',
                },
                icon: {
                    default: '#0F1C03',
                    selected: '#95D65C',
                },
            },
            secondary: {
                text: {
                    default: '#FFFFFF',
                    disabled: '#8A938C',
                },
                fill: {
                    default: '#FFFFFF14',
                    active: '#FFFFFF29',
                    selected: '#FFFFFF0A',
                },
                icon: {
                    default: '#FFFFFF',
                    selected: '#95D65C',
                },
            },
        },
        debitcard: {
            theme: {
                obsidian: {
                    fill: '#121615',
                },
                emerald: {
                    fill: '#0B5B4E',
                },
                graphite: {
                    fill: '#4E5551',
                },
                amethyst: {
                    fill: '#6A247F',
                },
                oceanic: {
                    fill: '#005566',
                },
                arctic: {
                    fill: '#FFFFFF',
                },
                lavender: {
                    fill: '#A49FEF',
                },
                lime: {
                    fill: '#95D65C',
                },
                aero: {
                    fill: '#A7D4FB',
                },
            },
        },
        badge: {
            surface: {
                neutral: '#121615',
                inverted: '#F3F3F2',
                accent: '#0F1C03',
                critical: '#22060A',
                warning: '#240F04',
                info: '#041525',
            },
            text: {
                neutral: '#FFFFFF',
                inverted: '#050A0A',
                accent: '#DEF4CD',
                critical: '#F9C8D0',
                warning: '#FDD7C4',
                info: '#D9ECFD',
            },
            icon: {
                neutral: '#FFFFFF',
                inverted: '#050A0A',
                accent: '#95D65C',
                critical: '#F17E8E',
                warning: '#F9A276',
                info: '#76BDF9',
            },
        },
        text: {
            neutral: {
                strong: '#FFFFFF',
                default: '#D5D9D4',
                muted: '#AFB6AF',
            },
            critical: {
                strong: '#F9C8D0',
                default: '#F17E8E',
                muted: '#22060A',
            },
            info: {
                strong: '#D9ECFD',
                default: '#76BDF9',
                muted: '#041525',
            },
            warning: {
                strong: '#FDD7C4',
                default: '#F66C28',
                muted: '#240F04',
            },
            accent: {
                strong: '#DEF4CD',
                default: '#95D65C',
                muted: '#0F1C03',
            },
            disabled: '#8A938C',
        },
        surface: {
            default: '#050A0A',
            container: '#0D1110',
            neutral: {
                strong: '#E0E2DE',
                default: '#AFB6AF',
                muted: '#121615',
            },
            critical: {
                strong: '#F9C8D0',
                default: '#E93553',
                muted: '#22060A',
            },
            warning: {
                strong: '#FDD7C4',
                default: '#F66C28',
                muted: '#240F04',
            },
        },
        icon: {
            strong: '#FFFFFF',
            default: '#AFB6AF',
            muted: '#4E5551',
            inverted: '#050A0A',
            accent: '#95D65C',
            critical: '#F17E8E',
            info: '#76BDF9',
            warning: '#F9A276',
            link: '#75C92C',
        },
    },
    opacity: {
        none: 0,
        sm: 0.25,
        md: 0.5,
        lg: 0.75,
        full: 1,
    },
    borderRadius: {
        none: 0,
        xs: 6,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
        full: 9999,
    },
    text: {
        bottomsheet: {
            title: {
                fontFamily: 'SaansMedium',
                lineHeight: 24,
                fontSize: 18,
                letterSpacing: 0.28800000000000003,
                textTransform: 'none',
                textDecorationLine: 'none',
            },
        },
        title: {
            lg: {
                fontFamily: 'SaansSemibold',
                lineHeight: 36,
                fontSize: 28,
                letterSpacing: 0.224,
                textTransform: 'none',
                textDecorationLine: 'none',
            },
            md: {
                fontFamily: 'SaansSemibold',
                lineHeight: 32,
                fontSize: 24,
                letterSpacing: 0.28800000000000003,
                textTransform: 'none',
                textDecorationLine: 'none',
            },
            sm: {
                fontFamily: 'SaansSemibold',
                lineHeight: 24,
                fontSize: 20,
                letterSpacing: 0.28,
                textTransform: 'none',
                textDecorationLine: 'none',
            },
        },
        subtitle: {
            lg: {
                fontFamily: 'SaansBook',
                lineHeight: 24,
                fontSize: 16,
                letterSpacing: 0.32,
                textTransform: 'none',
                textDecorationLine: 'none',
            },
            md: {
                fontFamily: 'SaansBook',
                lineHeight: 24,
                fontSize: 14,
                letterSpacing: 0.336,
                textTransform: 'none',
                textDecorationLine: 'none',
            },
            sm: {
                fontFamily: 'SaansBook',
                lineHeight: 20,
                fontSize: 12,
                letterSpacing: 0.336,
                textTransform: 'none',
                textDecorationLine: 'none',
            },
        },
        body: {
            lg: {
                fontFamily: 'SaansRegular',
                lineHeight: 24,
                fontSize: 16,
                letterSpacing: 0.32,
                textTransform: 'none',
                textDecorationLine: 'none',
            },
            md: {
                fontFamily: 'SaansRegular',
                lineHeight: 24,
                fontSize: 14,
                letterSpacing: 0.336,
                textTransform: 'none',
                textDecorationLine: 'none',
            },
            sm: {
                fontFamily: 'SaansRegular',
                lineHeight: 20,
                fontSize: 12,
                letterSpacing: 0.336,
                textTransform: 'none',
                textDecorationLine: 'none',
            },
        },
    },
    border: {
        bottomsheet: {
            swipe: {
                color: '#FFFFFF29',
                width: 4,
                style: 'solid',
            },
        },
        sm: 1,
        md: 2,
        lg: 4,
    },
    spacing: {
        none: 0,
        '4Xs': 2,
        '3Xs': 4,
        '2Xs': 6,
        xs: 8,
        sm: 12,
        md: 16,
        lg: 20,
        xl: 24,
        '2Xl': 32,
        '3Xl': 40,
        '4Xl': 48,
        '5Xl': 56,
        '6Xl': 64,
        '12Xl': 128,
    },
} as const;

export default tokens;
