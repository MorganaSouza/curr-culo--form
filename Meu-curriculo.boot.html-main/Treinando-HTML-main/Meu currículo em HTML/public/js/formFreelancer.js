document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário
    let isValid = true; // Variável para rastrear a validade do formulário
    let missingFields = []; // Array para armazenar os campos faltantes

    // Remove as classes de erro e sucesso antes de verificar
    const requiredFields = ['firstName', 'lastName', 'phone', 'email', 'message', 
        'meetingShift', 'meetingTime', 'deliveryDate'];
    
    requiredFields.forEach(fieldId => {
        const input = document.getElementById(fieldId);
        input.classList.remove('error', 'success'); // Remove classes anteriores

        if (!input.checkValidity()) {
            input.classList.add('error'); // Adiciona classe de erro se o campo não é válido
            isValid = false; // Marca o formulário como inválido
            missingFields.push(input.previousElementSibling.innerText); 
            // Adiciona o rótulo do campo ao array
        } else {
            input.classList.add('success');
             // Adiciona classe de sucesso se o campo é válido
        }
    });

    // Verifica se o formulário é válido
    if (isValid) {
        alert('Formulário enviado com sucesso!'); // Alerta de sucesso

        // Reinicia o formulário
        this.reset(); // Reseta o formulário

        // Remove as classes de sucesso após o reset
        requiredFields.forEach(fieldId => {
            const input = document.getElementById(fieldId);
            input.classList.remove('success'); // Remove a classe de sucesso
        });
    } else {
        // Alerta de erro com todos os campos que precisam ser preenchidos
        alert('Por favor, preencha os seguintes campos: ' + missingFields.join(', ')); 
        // Mostra todos os campos faltantes
    }
});

// Adiciona evento de input para validar campos enquanto o usuário digita
const inputs = document.querySelectorAll('input, textarea, select');
inputs.forEach(input => {
    input.addEventListener('input', function() {
        if (this.checkValidity()) {
            this.classList.add('success'); // Adiciona classe de sucesso se o campo é válido
            this.classList.remove('error'); // Remove a classe de erro
        } else {
            this.classList.remove('success'); // Remove a classe de sucesso
        }
    });
});

// Função para formatar o telefone
document.getElementById('phone').addEventListener('input', function() {
    let value = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (value.length > 10) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3'); // Formato (XX) XXXXX-XXXX
    } else if (value.length > 5) {
        value = value.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3'); // Formato (XX) XXXXX
    } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2'); // Formato (XX)
    }
    this.value = value; // Atualiza o valor do campo
});