var demoText = 'Development tools is leuk';

function openHomePage() {
    browser.get('http://37.97.180.18:' + process.env.PORT);
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
        browser.waitForAngular();
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
        var todos = getTodos();
        todos.last().click();

        browser.waitForAngular();

        getTodos().count().then(function (actualCount) {
            expect(todos.count()).toEqual(actualCount);
        });
    });

//    it('should delete all todos', function () {
//        deleteAll();
//        browser.waitForAngular();
//        expect(element.all(by.cssContainingText(demoText)).count()).toEqual(0);
//    });

});

describe('todo wrong', function () {
    openHomePage();

    it('should not add a todo when text empty', function () {
        getTodos().count().then(function (count) {
            element(by.id('todoText')).clear();
            element(by.id('addTodo')).click();
            browser.waitForAngular();
            expect(getTodos().count()).toEqual(count);
        });
    });

});
