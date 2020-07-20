import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import compose from "recompose/compose";
import {connect} from "react-redux";

const useStyles = (theme) => ({
    root: {
        width: 250,
    },
    input: {
        width: 55,
    },
});

class CategorySlider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.category.startingValue,
        };

        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSliderChange(event, newValue) {
        this.setState({value: newValue});
    };

    handleInputChange(event) {
        this.setState({value: (event.target.value === '' ? '' : Number(event.target.value))});
    };

    handleBlur = () => {
        if (this.state.value < 0) {
            this.setState({value: 0});
        } else if (this.state.value > this.props.category.maxValue) {
            this.setState({value: this.props.category.maxValue});
        }
    };

    render() {
        const {classes} = this.props;
        return (

            <div className={classes.root}>
                <Typography id={this.props.category.name} gutterBottom>
                    {this.props.category.name}
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                        <Slider
                            value={this.state.value}
                            min={0}
                            step={this.props.category.sliderStep}
                            max={this.props.category.maxValue}
                            scale={(x) => x * 10}
                            onChange={this.handleSliderChange}
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            className={classes.input}
                            value={this.state.value}
                            margin="dense"
                            onChange={this.handleInputChange}
                            onBlur={this.handleBlur}
                            inputProps={{
                                step: this.props.category.inputStep,
                                min: 0,
                                max: this.props.category.maxValue,
                                type: 'number',
                                'aria-labelledby': this.props.category.name,
                            }}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    //name is by convention
};

export default compose(
    withStyles(useStyles),
    connect(mapStateToProps)
)(CategorySlider);