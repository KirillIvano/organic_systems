from oright.settings import HOST, HOST_WITH_PORT


def get_order_link(order):
    return f'{HOST}/order/{order.id}?key={order.hash}'

