import React, { Component } from 'react';
import { Platform } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { APY_KEY } from 'react-native-dotenv';

export default class Search extends Component {

    state = {
        searchFocused: false
    }

    render() {
        const { searchFocused } = this.props;
        const { onLocationSeleted } = this.props;

        return (
            <GooglePlacesAutocomplete
                placeholder='Para onde?'
                placeholderTextColor='#333333'
                onPress={onLocationSeleted}
                query={{
                    key: APY_KEY,
                    language: 'pt'
                }}
                textInputProps={{
                    autoCapitalize: "none",
                    autoCorrect: false,
                    onFocus: () => { this.setState({ searchFocused: true }) },
                    onblur: () => { this.setState({ searchFocused: false }) }
                }}
                listViewDisplayed={searchFocused}
                fetchDetails
                enablePoweredByContainer={false}
                styles={{
                    container: {
                        position: 'absolute',
                        top: Platform.select({ ios: 60, android: 40 }),
                        width: '100%'
                    },
                    textInputContainer: {
                        flex: 1,
                        backgroundColor: 'transparent',
                        height: 54,
                        marginHorizontal: 20,
                        borderTopWidth: 0,
                        borderBottomWidth: 0
                    },
                    textInput: {
                        height: 54,
                        borderRadius: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingLeft: 20,
                        paddingRight: 20,
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        elevation: 5,
                        shadowColor: '#000000',
                        shadowOpacity: 0.1,
                        shadowOffset: { x: 0, y: 0 },
                        shadowRadius: 15,
                        borderWidth: 1,
                        borderColor: "#dddddd",
                        fontSize: 18
                    },
                    listView: {
                        borderWidth: 1,
                        borderColor: "#ddd",
                        backgroundColor: '#fff',
                        marginHorizontal: 20,
                        elevation: 5,
                        shadowColor: '#000000',
                        shadowOpacity: 0.1,
                        shadowOffset: { x: 0, y: 0 },
                        shadowRadius: 15,
                        marginTop: 10
                    },
                    description: {
                        fontSize: 16
                    },
                    row: {
                        padding: 20,
                        height: 58
                    },
                }}
            />
        );
    }
}