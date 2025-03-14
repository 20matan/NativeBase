'use_strict';
import _ from 'lodash';
//import ReactNativePropRegistry from 'react-native/Libraries/Renderer/src/renderers/native/ReactNativePropRegistry';
// For compatibility with RN 0.25
// import ReactNativePropRegistry from "react-native/Libraries/ReactNative/ReactNativePropRegistry";
import { ReactNativePropRegistry } from 'react-native';


module.exports = function(incomingProps, defaultProps) {
    // External props has a higher precedence
    var computedProps = {};

    incomingProps = _.clone(incomingProps);
    delete incomingProps.children;

    var incomingPropsStyle = incomingProps.style;
    delete incomingProps.style;

    // console.log(defaultProps, incomingProps);
    if(incomingProps) {
      _.assign(computedProps, defaultProps, incomingProps);
    } else
        computedProps = defaultProps;
    // Pass the merged Style Object instead
    if(incomingPropsStyle) {

        var computedPropsStyle = {};
        computedProps.style = {};
        if (Array.isArray(incomingPropsStyle)) {
            _.forEach(incomingPropsStyle, (style)=>{
                if(typeof style == 'number') {
                    _.merge(computedPropsStyle, ReactNativePropRegistry.getByID(style));
                } else {
                    _.merge(computedPropsStyle, style);
                }
            })

        }
        else {
            if(typeof incomingPropsStyle == 'number') {
                computedPropsStyle = ReactNativePropRegistry.getByID(incomingPropsStyle);
            } else {
                computedPropsStyle = incomingPropsStyle;
            }
        }

        _.merge(computedProps.style, defaultProps.style, computedPropsStyle);


    }
    // console.log("computedProps ", computedProps);
    return computedProps;
}
