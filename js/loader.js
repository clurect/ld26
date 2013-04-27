function Loader(file)
{
    this.file = file;
	// if (typeof(_loader_prototype_called) == 'undefined')
	// {
	// 	_loader_prototype_called = true;
	// 	Loader.prototype.getOfType = getOfType;
	// }
	function getOfType(type){
		var coors = [];
		if (type==='rabbit'){
			coors = [0,0,96,108];
			return coors;
		}
	}
}