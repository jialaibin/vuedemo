let data = {
    timeoutId: [],
    vHeight: window.innerHeight,
    vWidth: window.innerWidth,
    checkClick: true,
};

window.Global = {
    get: (key) => {
	    return data[key];
	},
    set: (key, value) => {
	    data[key] = value;
	}, 
};
export default window.Global;