module.exports = (data_informada, idioma_selecionado) => {

    let turno_horario = data_informada.getHours() < 12 && data_informada.getHours() > 0 ? "am" : "pm";

    if (idioma_selecionado === "pt-br")
        return `${data_informada.getDate()} de ${data_informada.toLocaleString('pt', {month: 'long'})} de ${data_informada.getFullYear()} às ${("0" + data_informada.getHours()).substr(-2) + ":" + ("0" + data_informada.getMinutes()).substr(-2)} ${turno_horario}`;
    else if(idioma_selecionado == "en-us")
        return `${data_informada.toLocaleString('en', {month: 'long'})} ${data_informada.getDate()}, ${data_informada.getFullYear()} at ${("0" + data_informada.getHours()).substr(-2)}:${("0" + data_informada.getMinutes()).substr(-2)} ${turno_horario}`;
    else
        return `${data_informada.toLocaleString('fr', {month: 'long'})} ${data_informada.getDate()}, ${data_informada.getFullYear()} et ${("0" + data_informada.getHours()).substr(-2)}:${("0" + data_informada.getMinutes()).substr(-2)} ${turno_horario}`;
}