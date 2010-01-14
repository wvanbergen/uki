include('../view.js');

uki.view.Cssable = new function() {
    var proto = this;
    
    proto._css = function(name, value) {
        if (value === undefined) return this._dom.style[name];
        this._dom.style[name] = value;
        return this;
    };
    
    uki.each('fontSize,textAlign,color,fontFamily,fontWeight,lineHeight,zIndex'.split(','), function(i, name) {
        proto[name] = function(value) {
            return this._css(name, value);
        };
    });
    
    var probe = uki.createElement('div').style;
    uki.each(['userSelect', 'MozUserSelect', 'WebkitUserSelect'], function() {
        if (typeof probe[this] == 'string') proto._textSelectProp = this;
    });
    
    /**
     * Sets wherether text of the view can be selected.
     *
     * @param {boolean=} state 
     * @returns {boolean|uki.view.Base} current textSelectable state of self
     */
    proto.textSelectable = function(state) {
        if (state === undefined) return this._textSelectable;
        
        this._textSelectable = state;
        if (this._textSelectProp) {
            this._dom.style[this._textSelectProp] = state ? '' : this._textSelectProp == 'MozUserSelect' ? '-moz-none' : 'none';
        } else {
            this._dom.unselectable = state ? '' : 'on';
        }
        this._dom.style.cursor = state ? 'text' : 'default';
        return this;
    };
};