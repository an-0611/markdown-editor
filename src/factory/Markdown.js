function MarkDown() { }

MarkDown.prototype.click = function() {
  // history.push('/');
}

MarkDown.factory = function({id, subject, content}) {
  if (typeof subject !== 'string') {
    throw new Error('subject must be string')
  }

  if (typeof content !== 'string') {
    throw new Error('content must be string')
  }


}