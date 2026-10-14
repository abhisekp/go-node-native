package handlers

import (
	"github.com/abhisekp/napi-go"
	"go-node-native/lib"
)

func SumHandler(env napi.Env, info napi.CallbackInfo) napi.Value {
	args, status := napi.GetCbInfo(env, info)
	if status != napi.StatusOK {
		return nil
	}
	if len(args.Args) != 2 {
		napi.ThrowError(env, "EArgumentLength", "Wrong number of arguments")
		return nil
	}

	a, status := napi.GetValueDouble(env, args.Args[0])
	if status != napi.StatusOK {
		napi.ThrowError(env, "EInvalidValue", "Invalid value for a")
		return nil
	}
	b, status := napi.GetValueDouble(env, args.Args[1])
	if status != napi.StatusOK {
		napi.ThrowError(env, "EInvalidValue", "Invalid value for b")
		return nil
	}

	result, status := napi.CreateDouble(env, lib.Sum(a, b))
	if status != napi.StatusOK {
		return nil
	}

	return result
}
