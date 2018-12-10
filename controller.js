
var dotCount = 0;

function  operandAction(strExpression , operand)
{
	if(strExpression.length > 0) 
	{
		let last = strExpression[strExpression.length-1]
		if (termType(last) !== term.rBracket)
		{
			return true;
		}
		return false;
	}
	return true;
}

function operatorAction(strExpression , operator)
{
	if(strExpression.length > 0) 
	{
		let last = strExpression[strExpression.length-1]
		if (termType(last) === term.rBracket || termType(last) === term.operand) 
		{
			dotCount = 0;
			return true;
		}
	}
	return false;
}

var bracketCount = 0;

function bracketAction(strExpression , bracket)
{
	if(strExpression.length > 0) 
	{
		let last = strExpression[strExpression.length-1]
		if (termType(last) === term.rBracket || termType(last) === term.operand) 
		{
			if(bracketCount === 0)
			{
				return "";
			}
			bracketCount -= 1;
			dotCount = 0;
			return ")";          
		}
		else
		{
			if(termType(last) === term.dot)
			{
				return "";
			}
			bracketCount += 1;
			dotCount = 0;
			return "(";
		}
	}
	dotCount = 0;
	bracketCount += 1;
	return "(";
}


function  dotAction(strExpression , dot)
{
	if(strExpression.length > 0) 
	{
		let last = strExpression[strExpression.length-1]
		if (termType(last) !== term.operand)
		{
			return false;
		}
	}
	if(dotCount === 1)
	{
		return false;
	}
	dotCount += 1;
	return true;

}


function equalAction(strExpression , equal)
{
	if(strExpression.length > 0) 
	{
		let last = strExpression[strExpression.length-1]
		if (termType(last) === term.rBracket || termType(last) === term.operand) 
		{
			if(bracketCount===0)
			{		
				dotCount = 0;
				result = calculateExpression(strExpression).toString();
				if(result.includes("."))
				{
					dotCount = 1;
				}
				return result;
			}
		}
	}
	return "";
}
