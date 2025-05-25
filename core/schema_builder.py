# schema_builder.py

from typing import Any, Callable, List

class Schema:
    def __init__(self):
        self.transforms: List[Callable[[Any], Any]] = []
        self.assertions: List[Callable[[Any], bool]] = []

    def transform(self, fn: Callable[[Any], Any]):
        self.transforms.append(fn)
        return self

    def assert_that(self, fn: Callable[[Any], bool]):
        self.assertions.append(fn)
        return self

    def validate(self, input_value: Any) -> bool:
        value = input_value
        for transform in self.transforms:
            value = transform(value)
        for check in self.assertions:
            if not check(value):
                return False
        return True