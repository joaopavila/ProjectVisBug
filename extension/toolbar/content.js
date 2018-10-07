class Channel {
  constructor({name, model}) {
    this._port      = chrome.runtime.connect({ name });
    this._message   = chrome.runtime;
    this._model     = model;

    this.post({action: 'register'});
  }

  post(data) {
    this._port.postMessage(
      Object.assign(this._model, { data }));
  }

  message(data) {
    this._message.postMessage(
      Object.assign(this._model, { data }));
  }

  get port() {
    return this._port
  }

  get message() {
    return this._message
  }
}

var pallete           = document.createElement('tool-pallete');
const channel_name    = 'design-artboard';
const appendPallete   = () => document.body.prepend(pallete);

const Pipe = new Channel({
  name: channel_name,
  model: {
    src_channel:    channel_name,
    target_channel: 'design-panel',
  }
});

const layersFromDOM = ({nodeName, className, id, children}) => ({
  nodeName, className, id, 
  children: [...children].map(layersFromDOM),
});

// append and watch toolbar selections
appendPallete();
pallete.selectorEngine.onSelectedUpdate(nodes =>
  Pipe.post(nodes.map(layersFromDOM)));

// watch pipe messages (they'll be auto filtered for this pipe)
Pipe.port.onMessage.addListener(message => {
  console.log(`${channel_name} recieved port message`, message);
});

Pipe.message.onMessage.addListener((request, sender, sendResponse) => {
  console.log(`${channel_name} onMessage`, request);

  const { action, params } = request;

  // only respond to toolSelection atm
  if (action != 'toolSelected') return

  const [pallete] = document.getElementsByTagName('tool-pallete');
  pallete && pallete[action](params);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZXMiOlsiLi4vdXRpbHMvY2hhbm5lbC5qcyIsImluamVjdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFubmVsIHtcbiAgY29uc3RydWN0b3Ioe25hbWUsIG1vZGVsfSkge1xuICAgIHRoaXMuX3BvcnQgICAgICA9IGNocm9tZS5ydW50aW1lLmNvbm5lY3QoeyBuYW1lIH0pXG4gICAgdGhpcy5fbWVzc2FnZSAgID0gY2hyb21lLnJ1bnRpbWVcbiAgICB0aGlzLl9tb2RlbCAgICAgPSBtb2RlbFxuXG4gICAgdGhpcy5wb3N0KHthY3Rpb246ICdyZWdpc3Rlcid9KVxuICB9XG5cbiAgcG9zdChkYXRhKSB7XG4gICAgdGhpcy5fcG9ydC5wb3N0TWVzc2FnZShcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5fbW9kZWwsIHsgZGF0YSB9KSlcbiAgfVxuXG4gIG1lc3NhZ2UoZGF0YSkge1xuICAgIHRoaXMuX21lc3NhZ2UucG9zdE1lc3NhZ2UoXG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMuX21vZGVsLCB7IGRhdGEgfSkpXG4gIH1cblxuICBnZXQgcG9ydCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcG9ydFxuICB9XG5cbiAgZ2V0IG1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21lc3NhZ2VcbiAgfVxufSIsImltcG9ydCBDaGFubmVsIGZyb20gJy4uL3V0aWxzL2NoYW5uZWwuanMnXG5cbnZhciBwYWxsZXRlICAgICAgICAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rvb2wtcGFsbGV0ZScpXG5jb25zdCBjaGFubmVsX25hbWUgICAgPSAnZGVzaWduLWFydGJvYXJkJ1xuY29uc3QgYXBwZW5kUGFsbGV0ZSAgID0gKCkgPT4gZG9jdW1lbnQuYm9keS5wcmVwZW5kKHBhbGxldGUpXG5cbmNvbnN0IFBpcGUgPSBuZXcgQ2hhbm5lbCh7XG4gIG5hbWU6IGNoYW5uZWxfbmFtZSxcbiAgbW9kZWw6IHtcbiAgICBzcmNfY2hhbm5lbDogICAgY2hhbm5lbF9uYW1lLFxuICAgIHRhcmdldF9jaGFubmVsOiAnZGVzaWduLXBhbmVsJyxcbiAgfVxufSlcblxuY29uc3QgbGF5ZXJzRnJvbURPTSA9ICh7bm9kZU5hbWUsIGNsYXNzTmFtZSwgaWQsIGNoaWxkcmVufSkgPT4gKHtcbiAgbm9kZU5hbWUsIGNsYXNzTmFtZSwgaWQsIFxuICBjaGlsZHJlbjogWy4uLmNoaWxkcmVuXS5tYXAobGF5ZXJzRnJvbURPTSksXG59KVxuXG4vLyBhcHBlbmQgYW5kIHdhdGNoIHRvb2xiYXIgc2VsZWN0aW9uc1xuYXBwZW5kUGFsbGV0ZSgpXG5wYWxsZXRlLnNlbGVjdG9yRW5naW5lLm9uU2VsZWN0ZWRVcGRhdGUobm9kZXMgPT5cbiAgUGlwZS5wb3N0KG5vZGVzLm1hcChsYXllcnNGcm9tRE9NKSkpXG5cbi8vIHdhdGNoIHBpcGUgbWVzc2FnZXMgKHRoZXknbGwgYmUgYXV0byBmaWx0ZXJlZCBmb3IgdGhpcyBwaXBlKVxuUGlwZS5wb3J0Lm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihtZXNzYWdlID0+IHtcbiAgY29uc29sZS5sb2coYCR7Y2hhbm5lbF9uYW1lfSByZWNpZXZlZCBwb3J0IG1lc3NhZ2VgLCBtZXNzYWdlKVxufSlcblxuUGlwZS5tZXNzYWdlLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcbiAgY29uc29sZS5sb2coYCR7Y2hhbm5lbF9uYW1lfSBvbk1lc3NhZ2VgLCByZXF1ZXN0KVxuXG4gIGNvbnN0IHsgYWN0aW9uLCBwYXJhbXMgfSA9IHJlcXVlc3RcblxuICAvLyBvbmx5IHJlc3BvbmQgdG8gdG9vbFNlbGVjdGlvbiBhdG1cbiAgaWYgKGFjdGlvbiAhPSAndG9vbFNlbGVjdGVkJykgcmV0dXJuXG5cbiAgY29uc3QgW3BhbGxldGVdID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3Rvb2wtcGFsbGV0ZScpXG4gIHBhbGxldGUg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
