package lib

import "cmp"

func Sum[T cmp.Ordered](a, b T) T {
	return a + b
}
