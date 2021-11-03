from random import randint

def maximum_number(num1, num2):
    result = num1-num2

    if result > 0:
        return num1

    elif result < 0:
        return num2

        

max_number = 0

for index in range(10):
    number = randint(1, 50)
    print(number)

    max_number = maximum_number(max_number, number)

print("max number is ", max_number)