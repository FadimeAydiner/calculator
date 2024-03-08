import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

export default function App() {

  const [number, setNumber] = useState(0);
  const [firstNumber, setFirstNumber] = useState(0);
  const [operator, setOperator] = useState('');
  const [displayValue, setDisplayValue] = useState('');

  const handleNumbers = (number) => {
    setDisplayValue(displayValue + number);
  };

  const handleOperator = (operator) => {
    if (operator === 'C') {
      handleClear();
    } else {
      const previousNumber = parseInt(displayValue);
      setOperator(operator);
      setDisplayValue(displayValue + operator);
      setFirstNumber(previousNumber); // setOperator'den önce çağrılacak
    }
  };

  const extractNumberAfterOperator = (input, operator) => {
    const regex = new RegExp(`\\${operator}(\\d+)`);
    console.log("Regex Match:", input.match(regex));
    const match = regex.exec(input);
    if (match && match[1]) {
      return parseFloat(match[1]);
    }
    return null;
  };


    const handleEqual = () => {
      const secondNumber = parseInt(extractNumberAfterOperator(displayValue, operator));
      console.log(firstNumber)
      console.log(secondNumber)
      console.log(secondNumber+firstNumber)
      let result=0;
      if (operator === '/') {
        result=firstNumber / secondNumber;
      } else if (operator === '*') {
        result=firstNumber * secondNumber;
      } else if (operator === '-') {
        result=firstNumber - secondNumber;
      } else if (operator === '+') {
        result=firstNumber + secondNumber;
      }
      
      setDisplayValue(result.toString()); // setNumber'dan sonra çağrılacak
    };



  const handleClear = () => {
    setNumber(0);
    setDisplayValue('');
    setFirstNumber(0);
    setOperator('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CALCULATOR</Text>
      <TextInput style={styles.displayText}
      value={displayValue.toString()}/>
      <View style={styles.rowContainer} >
        <TouchableOpacity 
        style={styles.btn}
        onPress={()=>handleNumbers(7)}
        >
          <Text style={styles.btnText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.btn}
        onPress={()=>handleNumbers(8)}
        >
          <Text style={styles.btnText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.btn}
        onPress={()=>handleNumbers(9)}
        >
          <Text style={styles.btnText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.btn}
        onPress={()=>handleOperator('/')}
        >
          <Text style={styles.btnText}>/</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer} >
        <TouchableOpacity 
        style={styles.btn}
        onPress={()=>handleNumbers(4)}
        >
          <Text style={styles.btnText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.btn}
        onPress={()=>handleNumbers(5)}
        >
          <Text style={styles.btnText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.btn}
        onPress={()=>handleNumbers(6)}
        >
          <Text style={styles.btnText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.btn}
        onPress={()=>handleOperator('*')}
        >
          <Text style={styles.btnText}>*</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer} >
        <TouchableOpacity 
        style={styles.btn}
        onPress={()=>handleNumbers(1)}
        >
          <Text style={styles.btnText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.btn}
        onPress={()=>handleNumbers(2)}
        >
          <Text style={styles.btnText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.btn}
        onPress={()=>handleNumbers(3)}
        >
          <Text style={styles.btnText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.btn}
        onPress={()=>handleOperator('+')}
        >
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer} >
        <TouchableOpacity 
        style={styles.btn}
        onPress={()=>handleNumbers(0)}
        >
          <Text style={styles.btnText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={[styles.btn,styles.btnClear]}
        onPress={()=>handleOperator('C')}
        >
          <Text style={styles.btnText}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.btn}
        onPress={()=>handleOperator('-')}
        >
          <Text style={styles.btnText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.btn}
        onPress={()=>handleEqual()}
        >
          <Text style={styles.btnText}>=</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    fontSize:50,
    fontWeight:'bold',
    color:'red',
    paddingBottom:40
  },
  displayText:{
    borderWidth:0,
    fontSize:30,
    fontWeight:'bold',
    color:'black',
    paddingBottom:20
  },
  rowContainer:{
    justifyContent:'space-between',
    height:'auto',
    width:'80%',
    flexDirection:'row',
    padding:5
  },
  btn:{
    width:70,
    height:70,
    backgroundColor:'orange',
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center',
    
  },
  btnText:{
    color:'white',
    fontSize:30,
    fontWeight:'bold'

  },
  btnClear:{
    backgroundColor:'red'
  }


});
