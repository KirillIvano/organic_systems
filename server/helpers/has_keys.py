def has_keys(d: dict, keys: list) -> bool:
    return all(
        map(
            lambda x: x in d.keys(),
            keys
        )
    )
