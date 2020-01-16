from quart import Quart, make_response, request
from quart_cors import cors
from quart.json import jsonify
import asyncio

app = Quart(__name__)
app = cors(app, allow_origin="*")


def encode_event(data, event=None, id=None, retry=None):
    message = f"data: {data}"
    if event is not None:
        message = f"{message}\nevent: {event}"
    if id is not None:
        message = f"{message}\nid: {id}"
    if retry is not None:
        message = f"{message}\nretry: {retry}"
    message = f"{message}\r\n\r\n"
    return message.encode("utf-8")


app.pools = set()

@app.route('/reaction/add', methods=['POST'])
async def add_reaction():
    data = await request.get_json()
    for pool in app.pools:
        await pool.put(data['message'])
    return jsonify(True)

@app.route('/reaction/stream')
async def get_reaction():
    pool = asyncio.Queue()
    app.pools.add(pool)
    async def send_events():
        while True:
            data = await pool.get()
            yield encode_event(data)

    response = await make_response(
        send_events(),
        {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Transfer-Encoding': 'chunked',
        },
    )
    response.timeout = None
    return response

if __name__ == "__main__":
    app.run(host= '0.0.0.0', port = 5000, debug = True)
