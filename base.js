var Util = {
    rand : function (minimo, maximo, decimais) {  
		var d = Math.pow(10, decimais||0);
		var ret = Math.floor(((Math.random() * (maximo - minimo + 1) - Math.abs(minimo))) * d) / d;
		if (ret > maximo) ret = maximo;
		if (ret < minimo) ret = minimo;
		return ret;
	}
};