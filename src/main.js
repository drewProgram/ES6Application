import api from './api';

class App {
    constructor() {
        // array que vai guardar todos os repos que eu buscar do github
        this.repositories = [];

        this.formEl = document.getElementById("repo-form");
        this.inputEl = document.querySelector('input[name=repository]');
        this.listEl = document.getElementById("repo-list");

        this.eventHandlers();
    }

    eventHandlers() {
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    setLoading(loading = true) {
        if (loading == true) {
            let loadingEl = document.createElement('span');
            loadingEl.appendChild(document.createTextNode('Carregando...'));
            loadingEl.setAttribute('id', 'loading');

            this.formEl.appendChild(loadingEl);

        }
        else {
            document.getElementById('loading').remove();
        }
    }

    async addRepository(event) {
        // previne o funcionamento padrão do form de recarregar a página
        event.preventDefault();

        const repoInput = this.inputEl.value;

        this.setLoading();

        if (repoInput.length === 0)
            return;

        try {
            const response = await api.get(`/repos/${repoInput}`);

            const { name, description, html_url, owner: { avatar_url } } = response.data;

            this.repositories.push({
                name,
                description,
                avatar_url,
                html_url
            });

            console.log(this.repositories);

            this.inputEl.value = '';

            this.render();
        }
        catch (error) {
            alert('O repositório não existe!');
        }

        this.setLoading(false);

    }

    render() {
        this.listEl.innerHTML = '';

        this.repositories.forEach(repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.description));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', 'blank');
            linkEl.setAttribute('href', repo.html_url);
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEl);
            listItemEl.appendChild(linkEl);

            this.listEl.appendChild(listItemEl);
        });
    }
}

new App();