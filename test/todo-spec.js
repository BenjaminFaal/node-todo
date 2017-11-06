var demoText = 'Development tools is leuk';

function openHomePage() {
    browser.get('http://localhost:9090/');
}

function getTodos() {
    return element.all(by.repeater('todo in todos'));
}

function addDemoTodo() {
    element(by.id('todoText')).sendKeys(demoText);
    element(by.id('addTodo')).click();
}

function deleteAll() {
    getTodos().each(function (todo) {
        todo.click();
    });
}

describe('todo add', function () {
    openHomePage();

    it('should add a todo', function () {
        addDemoTodo();

        var todos = getTodos();
        expect(todos.last().getText()).toEqual(demoText);
    });

    it('should mark a todo done', function () {
        addDemoTodo();

        var todos = getTodos();
        todos.get(0).click();

        browser.driver.sleep(1000);

        getTodos().count().then(function (actualCount) {
            expect(todos.count()).toEqual(actualCount);
        });
    });

    it('should delete all todos', function () {
        deleteAll();

        browser.driver.sleep(1000);

        expect(getTodos().count()).toEqual(0);
    });

});

describe('todo wrong', function () {
    openHomePage();

    it('should not add a todo when text empty', function () {
        element(by.id('todoText')).clear();
        element(by.id('addTodo')).click();

        expect(getTodos().count()).toEqual(0);
    });

});