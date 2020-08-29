/**
 * JSS styles for the StepSlider component.
 * @author Andrew Jarombek
 * @since 8/29/2020
 */

export default {
    stepSlider: {
        display: 'flex'
    },
    step: {
        display: 'flex',
        flexBasis: ({ stepCount }: { stepCount: number }) => `${(stepCount / 100) * 100}%`,
        alignItems: 'center'
    },
    edge: {
        height: 12,
        width: 'calc(100% - 20px)',
        backgroundColor: '#AAA'
    },
    vertex: {
        height: 20,
        width: 20,
        borderRadius: '50%',
        backgroundColor: '#AAA'
    }
};
