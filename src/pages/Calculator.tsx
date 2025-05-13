
import React, { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Code } from "lucide-react";

const Calculator = () => {
  // Change the display state type from 'number' to 'string' to handle both numbers and error messages
  const [display, setDisplay] = useState('0');
  const [currentOperation, setCurrentOperation] = useState<string | null>(null);
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const calculatorRef = useRef<HTMLDivElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);

  // Animation effect
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const clearCalculator = () => {
    setDisplay('0');
    setCurrentOperation(null);
    setStoredValue(null);
    setWaitingForOperand(false);
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
    
    // Add subtle pulse animation to display
    if (displayRef.current) {
      displayRef.current.classList.add('scale-[1.02]');
      setTimeout(() => {
        if (displayRef.current) {
          displayRef.current.classList.remove('scale-[1.02]');
        }
      }, 150);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const performOperation = (operation: string) => {
    // Parse the display as a float to handle the calculation
    const inputValue = parseFloat(display);

    if (storedValue === null) {
      setStoredValue(inputValue);
    } else if (currentOperation) {
      const result = calculate(storedValue, inputValue, currentOperation);
      // Now setDisplay can handle both number and string results
      setDisplay(String(result));
      // Only update storedValue if result is a number
      if (typeof result === 'number') {
        setStoredValue(result);
      } else {
        setStoredValue(null);
      }
    }

    setWaitingForOperand(true);
    setCurrentOperation(operation);
  };

  const calculate = (firstOperand: number, secondOperand: number, operation: string): number | string => {
    switch (operation) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return secondOperand !== 0 ? firstOperand / secondOperand : 'Error';
      default:
        return secondOperand;
    }
  };

  const calculateResult = () => {
    if (!currentOperation || storedValue === null || waitingForOperand) {
      return;
    }

    const inputValue = parseFloat(display);
    const result = calculate(storedValue, inputValue, currentOperation);
    
    setDisplay(String(result));
    setStoredValue(null);
    setCurrentOperation(null);
    setWaitingForOperand(true);
    
    // Add celebration animation to display
    if (displayRef.current) {
      displayRef.current.classList.add('scale-110');
      setTimeout(() => {
        if (displayRef.current) {
          displayRef.current.classList.remove('scale-110');
        }
      }, 300);
    }
  };

  const CalcButton = ({ 
    children, 
    onClick, 
    className = "",
    color = "gray" 
  }: { 
    children: React.ReactNode; 
    onClick: () => void; 
    className?: string;
    color?: "gray" | "purple" | "blue" | "red"; 
  }) => {
    const colorClasses = {
      gray: "bg-gray-100 hover:bg-gray-200 text-gray-800",
      purple: "bg-accent hover:bg-accent/90 text-white",
      blue: "bg-blue-600 hover:bg-blue-700 text-white",
      red: "bg-red-500 hover:bg-red-600 text-white",
    };
    
    return (
      <Button
        onClick={onClick}
        className={cn(
          "h-14 text-lg transition-all rounded-md hover:scale-105 active:scale-95 shadow-sm",
          colorClasses[color],
          className
        )}
      >
        {children}
      </Button>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8 md:py-12 bg-gradient-to-br from-white to-gray-100">
        <div className="w-full max-w-4xl mx-auto">
          <h1 className={`text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-gradient-text ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}>
            Interaktiver Taschenrechner
          </h1>
          
          <div className="mb-8 md:mb-10 bg-white p-6 rounded-lg shadow-md opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center mb-6">
              <Code size={24} className="text-accent mr-2" />
              <h2 className="text-xl font-semibold">Mein JavaScript-Projekt</h2>
            </div>
            <p className="text-gray-700 mb-4">
              Dieser Taschenrechner demonstriert meine grundlegenden JavaScript-Kenntnisse. 
              Ich habe ihn entwickelt, um Logik, Funktionen und Event-Handling in JavaScript zu üben.
            </p>
            <p className="text-gray-700">
              Probiere ihn aus und führe einige Berechnungen durch!
            </p>
          </div>

          <div 
            ref={calculatorRef} 
            className="w-full max-w-sm mx-auto opacity-0 animate-fade-in shadow-lg rounded-xl overflow-hidden"
            style={{ animationDelay: '400ms' }}
          >
            {/* Calculator Display */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 md:p-5">
              <div 
                ref={displayRef}
                className="text-right text-2xl md:text-3xl font-mono overflow-hidden overflow-ellipsis whitespace-nowrap transition-transform duration-150 ease-in-out"
              >
                {display}
              </div>
            </div>
            
            {/* Calculator Buttons */}
            <div className="bg-gray-100 p-4 grid grid-cols-4 gap-2 md:gap-3">
              <CalcButton onClick={clearCalculator} className="col-span-2" color="red">
                AC
              </CalcButton>
              <CalcButton onClick={() => performOperation('/')} color="purple">
                ÷
              </CalcButton>
              <CalcButton onClick={() => performOperation('*')} color="purple">
                ×
              </CalcButton>
              
              <CalcButton onClick={() => inputDigit('7')}>
                7
              </CalcButton>
              <CalcButton onClick={() => inputDigit('8')}>
                8
              </CalcButton>
              <CalcButton onClick={() => inputDigit('9')}>
                9
              </CalcButton>
              <CalcButton onClick={() => performOperation('-')} color="purple">
                −
              </CalcButton>
              
              <CalcButton onClick={() => inputDigit('4')}>
                4
              </CalcButton>
              <CalcButton onClick={() => inputDigit('5')}>
                5
              </CalcButton>
              <CalcButton onClick={() => inputDigit('6')}>
                6
              </CalcButton>
              <CalcButton onClick={() => performOperation('+')} color="purple">
                +
              </CalcButton>
              
              <CalcButton onClick={() => inputDigit('1')}>
                1
              </CalcButton>
              <CalcButton onClick={() => inputDigit('2')}>
                2
              </CalcButton>
              <CalcButton onClick={() => inputDigit('3')}>
                3
              </CalcButton>
              <CalcButton onClick={calculateResult} className="row-span-2" color="blue">
                =
              </CalcButton>
              
              <CalcButton onClick={() => inputDigit('0')} className="col-span-2">
                0
              </CalcButton>
              <CalcButton onClick={inputDecimal}>
                .
              </CalcButton>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Arda Görgüsenli
            </div>
            <div className="text-sm text-gray-500">
              Nordstr. 126, 47798 Krefeld | Tel: 0163 7859732 | goerguesenliarda@gmail.com
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Calculator;
