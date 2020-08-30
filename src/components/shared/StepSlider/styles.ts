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
        backgroundColor: '#BBB'
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
        justifyContent: 'center'
    },
    innerVertex: {
        height: 8,
        width: 8,
        borderRadius: '50%',
        position: 'absolute'
    }
};
