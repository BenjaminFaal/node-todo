var demoText = 'Development tools is leuk';

function getTodos() {
    return element.all(by.repeater('todo in todos'));
}

function addDemoTodo() {
    element(by.id('todoText')).sendKeys(demoText);
    element(by.id('addTodo')).click();
}

describe('todo add', function () {
    browser.get('http://localhost:8080/');

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
        getTodos().each(function (todo) {
            todo.click();
        });

        browser.driver.sleep(1000);

        expect(getTodos().count()).toEqual(0);
    });

});