# test_schema.py

from core.schema_builder import Schema

def test_schema_validation():
    schema = Schema()
    schema.transform(str.strip).transform(str.lower)
    schema.assert_that(lambda x: len(x) > 3)
    assert schema.validate("  Hello ")
    assert not schema.validate("  Hi ")