var term = {
	operand : -1,
	dot : -2,
	add : 30,
	sub : 31,
	mul : 40,
	div : 41,
	lBracket : 10,
	rBracket : 20,
};

function execute( op1, op2, operator)
{  
	switch (operator) {
	case term.add:
		return op1 + op2;
	case term.sub:
		return op1 - op2;
	case term.mul:
		return op1 * op2;
	case term.div:
		return op1 / op2;
	}
	//error
	return 0;
}

 function  termType(character) {
	switch (character)
	{
	case '+':
		return term.add;
	case '-':
		return term.sub;
	case '*':
		return term.mul;
	case '/':
		return term.div;
	case ')':
		return term.rBracket;
	case '(':
		return term.lBracket;
	case '.':
		return term.dot;
	}
	return term.operand;

}

function calculateExpression(strInfix)
{
	let  result = 0;
	let strOperand = "";
	let nOperand = 0;
    let operationStack = [];
	let operandStack = [];
 
	for (let i = 0; i < strInfix.length; i++)
	{
		while (i < strInfix.length && (termType(strInfix[i]) == term.operand || termType(strInfix[i]) == term.dot)) 
		{
			strOperand +=  strInfix[i];
			++i;
		}
		if (strOperand !== "")
		{
			nOperand = parseFloat(strOperand);
			operandStack.push(nOperand);
			strOperand = "";
		}
		if (termType(strInfix[i]) === term.lBracket) 
		{
			operationStack.push(term.lBracket);
		} 
		else 
		{
			while (operationStack.length !== 0 && operationStack [operationStack.length-1] / 10 >= termType(strInfix[i]) / 10) 
			{
				if (operandStack.length >= 2)
				{
					let op2 = operandStack.pop();
					
					let op1 = operandStack.pop();
					
					let operation = operationStack.pop();
					
					result = execute(op1, op2, operation);
					operandStack.push(result);
				}
				else
				{
					return result;
				}			
			}
			if (termType(strInfix[i]) === term.rBracket)
			{
				operationStack.pop();
			} 
			else
			{
				operationStack.push(termType(strInfix[i]));
			}
		}
	}
	if (operandStack.length >= 2)
	{
		let op2 = operandStack.pop();
		
		let op1 = operandStack.pop();
		
		let operation = operationStack.pop();
		
		result = execute(op1, op2, operation);
		operandStack.push(result);
	}

	result = operandStack.pop();
	return result;
}



