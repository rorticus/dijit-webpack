import declare from "dojo/_base/declare";
import domConstruct from "dojo/dom-construct";
import _WidgetBase from "dijit/_WidgetBase";
import Button from "dijit/form/Button";
import TextBox from "dijit/form/TextBox";

export default declare([_WidgetBase, _WidgetBase], {
    nameInput: undefined as TextBox | undefined,
    onChange: function (name: string) {
        return true;
    },
    postCreate: function () {
        this.inherited(arguments);
    },
    buildRendering: function () {
        this.domNode = domConstruct.create("div");
        let table = domConstruct.create("table", {
            style: {
                border: "1px solid #9f9f9f"
            },
            cellSpacing: 10
        }, this.domNode);
        let tr = domConstruct.create("tr", null, table);
        let td = domConstruct.create("td", null, tr);
        domConstruct.create("label", {
            for: this.id + "Name",
            innerHTML: "Name:"
        }, td);
        tr = domConstruct.create("tr", null, table);
        td = domConstruct.create("td", null, tr);
        this.nameInput = new TextBox({
            id: this.id + "Name",
            type: "text",
            name: "name",
            trim: true,
            propercase: true
        }).placeAt(td);
        this.own(this.nameInput);

        tr = domConstruct.create("tr", null, table);
        domConstruct.create("td", null, tr);
        tr = domConstruct.create("tr", null, table);
        td = domConstruct.create("td", null, tr);
        this.own(new Button({
            label: "Greet",
            onClick: (e: DocumentEvent) => {
                this.onChange(this.nameInput.get("value"));
                return true;
            }
        }).placeAt(td));
    }
});
