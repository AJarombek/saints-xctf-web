/**
 * JSS styles for the StepSlider component.
 * @author Andrew Jarombek
 * @since 8/29/2020
 */

export default {
    stepSlider: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: 24
    },
    step: {
        display: 'flex',
        flexBasis: ({ stepCount }: { stepCount: number }) => `${(stepCount / 100) * 100}%`,
        alignItems: 'center'
    },
    firstStep: {
        display: 'flex',
        alignItems: 'center'
    },
    mainEdge: {
        width: ({ stepCount }: { stepCount: number }) => `${(1 - (stepCount / 100)) * 100}%`,
        height: 8,
        position: 'absolute',
        backgroundColor: '#BBB',
        cursor: 'pointer'
    },
    edge: {
        height: 8,
        width: 'calc(100% - 10px)',
    },
    vertex: {
        height: 12,
        width: 12,
        borderRadius: '50%',
        backgroundColor: '#BBB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerVertex: {
        height: 8,
        width: 8,
        borderRadius: '50%',
        position: 'absolute',
        cursor: 'pointer'
    },
    filledEdge: {
        position: 'absolute',
        height: 12,
        width: ({ stepCount, value }: { stepCount: number, value: number }) =>
            `${(100 / (stepCount - 1)) * value}%`,
        top: -2
    },
    currentVertex: {
        marginLeft: ({ stepCount, value }: { stepCount: number, value: number }) =>
            `${(100 / (stepCount - 1)) * value}%`,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 20,
        width: 20,
        borderRadius: '50%',
        top: -6,
        left: -10,
        cursor: 'pointer',
        backgroundColor: '#F2F2F2',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
    },
    currentInnerVertex: {
        height: 12,
        width: 12,
        borderRadius: '50%',
        cursor: 'pointer'
    },
};
