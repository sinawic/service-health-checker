const services = document.getElementById('services')

const rednerList = list => {
  let html = ''
  list.map(item => html += `
    <div class="col-6 col-sm-4 col-md-3 mb-4">
      <div class="card shadow-sm" style="height: 12rem; overflow: hidden" title="${item.resultText}">
        <div class="card-body">
          <h5 class="card-title">
            ${item.name} 
          </h5>
          <p class="card-text">
            <a target="_blank" href="http://${item.host}:${item.port}">
              ${item.host}:${item.port}
            </a>
            <hr>
            <span style="color: ${item.result ? 'green' : 'crimson'}">
              ${item.resultText}
            </span>
          </p>
        </div>
      </div>
    </div>
  `)
  services.innerHTML = html
}

const show = group => {
  if (group === 'all')
    return rednerList(list)
  if (group === 'ups')
    return rednerList(list.filter(item => item.result))
  if (group === 'downs')
    return rednerList(list.filter(item => !item.result))
}