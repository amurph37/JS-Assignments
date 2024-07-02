import moment from "moment";

const getCurrentTimeStamp = () => {
    return moment().format('h:mm:ss a');
};

console.log('Response arriveed at: ' + getCurrentTimeStamp());
