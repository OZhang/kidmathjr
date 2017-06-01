import React,{Component} from 'react';
import { Platform, Text, View, ScrollView, StyleSheet } from 'react-native';
import NavigationBar from 'react-native-navbar';

export default class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {showResult: false};
    }

    toggleShow() {
        this.setState({
            showResult: !this.state.showResult
        });
    }
    reloadParent(){
        this.props.reload();
    }
    render() {
        let rows = this.props.questions.map(question =>
            <View style={styles.contentContainer} key={question.id}>
                <Text style={styles.question}>{question.question[0]}</Text>
                <Text style={styles.equalSign}>=</Text>
                <Text style={[styles.result, this.state.showResult ? styles.show : styles.hide]}>
                    {question.question[1]}
                </Text>
            </View>
        );
        const rightButtonConfig = {
            title: this.state.showResult ? '隐藏答案' : '显示答案',
            handler: () => {
                this.toggleShow()
            },
        };
        const leftButtonConfig = {
            title: '重新生成',
            handler: () => {
                this.setState({
                    showResult: false
                });
                this.reloadParent()
            },
        };
        const titleConfig = {
            title: '三年级脱式',
            tintColor: '#fff',
        };

        return (
            <View style={{flex: 1}}>
                <NavigationBar
                    style={styles.navigationBar}
                    title={titleConfig}
                    rightButton={rightButtonConfig}
                    leftButton={leftButtonConfig}>
                </NavigationBar>
                <ScrollView style={{flex: 1}}>
                    {rows}
                </ScrollView>
            </View>
        );
    }
}


const styles=StyleSheet.create({
    container: {
        flex: 1,
    },
    question: {
        flex: 6,
        fontSize: (Platform.OS === 'ios') ? 30 :25,
        marginLeft: 5,
    },
    equalSign: {
        flex: 1,
         fontSize: (Platform.OS === 'ios') ? 30 :25,
    },
    result: {
        flex: 2,
        fontSize: (Platform.OS === 'ios') ? 30 :25,
        marginRight: 5,
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        borderBottomWidth:
            0.5,
        borderColor: '#d6d7da',
    },
    scroll:{
        flex: 9,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    navigationBar:{
        backgroundColor: '#000',
    },
    navRight:{
        fontSize: 30,
        color:'#fff',
    },
    hide:{
        color:'#fff',
    },
    show:{
        color:'#000',
    },
});
