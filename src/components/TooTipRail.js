class TooltipRail extends Component {
    state = {
        value: null,
        percent: null,
    }

    onMouseEnter = () => {
        document.addEventListener('mousemove', this.onMouseMove)
    }

    onMouseLeave = () => {
        this.setState({ value: null, percent: null })
        document.removeEventListener('mousemove', this.onMouseMove)
    }

    onMouseMove = e => {
        const { activeHandleID, getEventData } = this.props

        if (activeHandleID) {
            this.setState({ value: null, percent: null })
        } else {
            this.setState(getEventData(e))
        }
    }

    render() {
        const { value, percent } = this.state
        const { activeHandleID, getRailProps } = this.props

        return (
            <Fragment>
                {!activeHandleID && value ? (
                    <div
                        style={{
                            left: `${percent}%`,
                            position: 'absolute',
                            marginLeft: '-11px',
                            marginTop: '-35px',
                        }}
                    >
                        <div className="tooltip">
                            <span className="tooltiptext">Value: {value}</span>
                        </div>
                    </div>
                ) : null}
                <div
                    className="react_time_tootip__container"
                    {...getRailProps({
                        onMouseEnter: this.onMouseEnter,
                        onMouseLeave: this.onMouseLeave,
                    })}
                />
                <div className="react_time_tootip__center" />
            </Fragment>
        )
    }
}

TooltipRail.propTypes = {
    getEventData: PropTypes.func,
    activeHandleID: PropTypes.string,
    getRailProps: PropTypes.func.isRequired,
}

TooltipRail.defaultProps = {
    disabled: false,
}
export default TooltipRail