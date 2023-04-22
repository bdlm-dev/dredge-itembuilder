import React, {Component} from 'react'

import styles from './builder.module.scss';
import util from './util.module.scss';

export default class Builder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInsane: false,
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInsaneCheck = this.handleInsaneCheck.bind(this);
        this.hexToRgb = this.hexToRgb.bind(this);
    }

    hexToRgb(hex) {
        return {
            "r": parseInt(hex.slice(1, 3), 16),
            "g": parseInt(hex.slice(3, 5), 16),
            "b": parseInt(hex.slice(5, 7), 16),
            "a": 255,
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const itemJson = Object.fromEntries(formData);
        const localizationJson = new Object;
        itemJson.prefix = itemJson.prefix.toLowerCase();
        itemJson.id = `${itemJson.prefix}.${itemJson.id}`;
        itemJson.itemNameKey = `${itemJson.id}.name`
        localizationJson[`${itemJson.itemNameKey}`] = itemJson.itemName;
        itemJson.itemDescriptionKey = `${itemJson.id}.desc`
        localizationJson[`${itemJson.itemDescriptionKey}`] = itemJson.itemDescription;
        itemJson.tooltipNotesColor = this.hexToRgb(itemJson.tooltipNotesColor);
        itemJson.tooltipTextColor = this.hexToRgb(itemJson.tooltipTextColor);
        if (itemJson.hasOwnProperty("itemInsaneName"))
        {
            itemJson.itemInsaneTitleKey = `${itemJson.id}.insaneName`;
            localizationJson[`${itemJson.itemInsaneTitleKey}`] = itemJson.itemInsaneName;
            itemJson.itemInsaneDescriptionKey = `${itemJson.id}.insaneDesc`;
            localizationJson[`${itemJson.itemInsaneDescriptionKey}`] = itemJson.itemInsaneDescription;
            
        }
        var toDelete = ["itemName", "itemDescription", "prefix", "itemInsaneName", "itemInsaneDescription"];
        for (const item of toDelete) {
            delete itemJson[item];
        }
        var outputItems = document.getElementById("outputItemBox");
        outputItems.innerHTML = JSON.stringify(itemJson, null, 4);
        var outputLocal = document.getElementById("outputLocalizationBox");
        outputLocal.innerHTML = JSON.stringify(localizationJson, null, 4);
        
    }

    handleInsaneCheck() {
        this.setState({
            showInsane: this.state.showInsane ? false : true
        });
    }

    render() {
        var insaneFields = (
            <>
                <FormInputField name="Insane Item Name" childid="itemName">
                    <input type="text" name="itemInsaneName" id="itemname"/>  
                </FormInputField>
                <FormInputField name="Insane Item Description" childid="itemName">
                    <input type="text" name="itemInsaneDescription" id="itemName"/>  
                </FormInputField>
            </>
        )
        return (
            <div className={styles.builder}>
                <form onSubmit={this.handleFormSubmit} className={styles.builderForm}>
                    <FormInputField name="Mod Name:" subtext="Your IDs will be prefaced with this" childid="prefix">
                        <input type="text" name="prefix" id="prefix" defaultValue="coolMod"/>
                    </FormInputField>
                    <FormInputField name="Item ID:" subtext="A unique name for your item used to spawn it">
                        <input type="text" name="id" id="itemID" defaultValue="item1"/>
                    </FormInputField>
                    <FormInputField name="Item Name:" childid="itemName">
                        <input type="text" name="itemName" id="itemName"/>
                    </FormInputField>
                    <FormInputField name="Sprite Name:" subtext="What have you called your item's texture in /Assets/Textures?" childid="sprite">
                        <input type="text" name="sprite" id="sprite" />
                    </FormInputField>
                    <FormInputField name="Item Description:" childid="itemDescription"> 
                        <input type="text" name="itemDescription" id="itemDescription"/>
                    </FormInputField>
                    <FormInputField name="Does your item have different text while you're insane?" childid="insane">
                        <input type="checkbox" id="insane" onChange={this.handleInsaneCheck}/>
                    </FormInputField>
                    {this.state.showInsane ? insaneFields : ""}
                    <div className={styles.typeSelectors}>
                        <TypeSelector label="Type" name="itemType" items={["None", "General", "Equipment"]}/>
                        <TypeSelector label="Subtype" name="itemSubtype" items={["None", "Fish", "Engine", "Rod", "General", "Relic", "Trinket", "Material", "Light", "Net", "Dredge"]}/>
                    </div>
                    <FormInputField name="Tooltip Text Colour" >
                        <input type="color" name="tooltipTextColor" id="tooltipTextColor" defaultValue="#ffffff"/>
                    </FormInputField>
                    <FormInputField name="Tooltip Notes Colour">
                        <input type="color" name="tooltipNotesColor" id="tooltipNotesColor" defaultValue="#ffffff"/>
                    </FormInputField>
                    <FormInputField name="Item Value" subtext="How much does your item sell for?">
                        <input type="number" name="value" id="value" defaultValue="10"/>
                    </FormInputField>
                    <input type="submit" value="Generate" className={styles.submitButton}/>
                </form>
                <div class={styles.codeOutput}>
                    <div className={styles.outputJson}>
                        <span>Item Data JSON</span>
                        <pre>
                            <code id="outputItemBox" />
                        </pre>
                    </div>
                    <div className={styles.outputLocalization}>
                        <span>Localization JSON</span>
                        <pre>
                            <code id="outputLocalizationBox" />

                        </pre>
                    </div>
                </div>
            </div>
        )
    }
}

class FormInputField extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.formEntry}>
                <label className={util.fullWidth} htmlFor={this.props.childid} title={this.props.subtext}>
                    {this.props.name}
                </label>
                {this.props.children}
            </div>
        )
    }
}

class TypeSelector extends Component {
    constructor(props) {
        super(props);

        this.insertOptions = this.props.items.map(n => <option value={n.toUpperCase()} key={n}>{n}</option>);
    }

    render() {
        
        return(
            <div className={styles.selector}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <select name={this.props.name} id={this.props.name}>
                    {this.insertOptions}
                </select>
            </div>
        )
    }
}