package handlers

import (
	"C"
	"fmt"
	"github.com/abhisekp/napi-go"
)

func MapHandler(env napi.Env, info napi.CallbackInfo) napi.Value {
	// Retrieve callback info
	cbInfo, status := napi.GetCbInfo(env, info)
	if status != napi.StatusOK {
		return nil
	}

	// Check if we have at least two arguments
	if len(cbInfo.Args) != 2 {
		napi.ThrowError(env, "EInvalidArg", "Must be 2 arguments")
		return nil
	}

	// Check the first argument is an array
	isArray, status := napi.IsArray(env, cbInfo.Args[0])
	if status != napi.StatusOK || !isArray {
		napi.ThrowError(env, "EStatusInvalidArg", "")
		return nil
	}

	// Get array length
	arrayLength, status := napi.GetArrayLength(env, cbInfo.Args[0])
	if status != napi.StatusOK {
		return nil
	}

	// Check the second argument is a function
	valueType, status := napi.Typeof(env, cbInfo.Args[1])
	if status != napi.StatusOK || valueType != napi.ValueTypeFunction {
		napi.ThrowError(env, "EInvalidArg", "Second argument must be a function")
		return nil
	}

	// Create an empty array to store the results
	resultArray, status := napi.CreateArray(env)
	if status != napi.StatusOK {
		return nil
	}

	var initValueType napi.ValueType

	// Iterate over array elements
	for i := 0; i < arrayLength; i++ {
		element, status := napi.GetElement(env, cbInfo.Args[0], i)
		if status != napi.StatusOK {
			return nil
		}

		// Check if element is a string or number
		valueType, status := napi.Typeof(env, element)
		if status != napi.StatusOK || (valueType != napi.ValueTypeString && valueType != napi.ValueTypeNumber) {
			napi.ThrowError(env, "EInvalidArg", "All array elements must be strings or numbers")
			return nil
		}

		if initValueType == napi.ValueTypeUndefined {
			initValueType = valueType
		}

		fmt.Printf("ValueType: %s\nInit ValueType: %s\n", valueType, initValueType)

		if valueType != initValueType {
			napi.ThrowError(env, "EInvalidArg", "All array elements must be of the same type (either string or number)")
			return nil
		}

		// Call the callback function with the current element
		result, status := napi.CallFunction(env, cbInfo.This, cbInfo.Args[1], 1, []napi.Value{element})
		if status != napi.StatusOK {
			return nil
		}

		// Set the result in the result array
		status = napi.SetElement(env, resultArray, i, result)
		if status != napi.StatusOK {
			return nil
		}
	}

	return resultArray
}
