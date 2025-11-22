import java.util.*;

public class Avaliacao1 {
    /*
    Escreva um programa que imprima os números de 1 a 100, mas com as seguintes regras:

 - Para múltiplos de 3, imprima "Fizz" no lugar do número.
 - Para múltiplos de 5, imprima "Buzz" no lugar do número.
 - Para números que são múltiplos de ambos 3 e 5, imprima "FizzBuzz".
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz

     */
    public static void main(String[]args){

         for (int i = 1; i <= 100; i++){
             if(i % 3 == 0 && i % 5 == 0){
                 System.out.println("FizzBuzz");
             } else if (i % 3 == 0){
                 System.out.println("Fizz");
             } else if (i % 5 == 0){
                 System.out.println("Buzz");
             } else {
                 System.out.println(i);
             }

         }

    }


}
