describe('Slug directive', function () {
    var $compile;
    var $rootScope;
    var element;

    beforeEach(module('slug'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;

        $rootScope.slugSrc = '';
        $rootScope.slug = '';

        element = $compile('<input slug slug-src="{{ slugSrc }}" ng-model="slug" type="text">')($rootScope);

        $rootScope.$digest();
    }));

    it('updates the model with slugified string', function () {
        expect($rootScope.slug).toEqual('');

        $rootScope.slugSrc = 'This is slug 1';
        $rootScope.$digest();
        expect($rootScope.slug).toEqual('this-is-slug-1');

        $rootScope.slugSrc = 'This is slug 2';
        $rootScope.$digest();
        expect($rootScope.slug).toEqual('this-is-slug-2');
    });

    it('stops updating the model once slugger itself is changed', function () {
        $rootScope.slugSrc = 'This is slug 1';
        $rootScope.$digest();
        expect($rootScope.slug).toEqual('this-is-slug-1');

        element.val('cannot-change-this-slug').triggerHandler('input');

        $rootScope.slugSrc = 'This is slug 2';
        $rootScope.$digest();
        expect($rootScope.slug).toEqual('cannot-change-this-slug');
        expect($rootScope.slugSrc).toEqual('This is slug 2');
    });

    it('continues updating the model after slugger itself is changed if prefer-own is set to false', function () {
        var element =  $compile('<input slugger slug-src="{{ slugSrc }}" prefer-own="false" ng-model="slug" type="text">')($rootScope);

        $rootScope.slugSrc = 'This is slug 1';
        $rootScope.$digest();
        expect($rootScope.slug).toEqual('this-is-slug-1');

        element.val('can-change-this-slug').triggerHandler('input');

        $rootScope.slugSrc = 'This is slug 2';
        $rootScope.$digest();
        expect($rootScope.slug).toEqual('this-is-slug-2');
    });

    it('prefers own value by default', function () {
        expect(element.controller('slug').preferOwn).toBe(true);
    });

    it('updates the model value when user changes it in the slug field itself', function (done) {
        element.val('This is not automatically generated slug').triggerHandler('input');

        setTimeout(function () {
            expect($rootScope.slug).toBe('this-is-not-automatically-generated-slug');
            expect($rootScope.slugSrc).toBe('');

            done();
        }, 300);
    });
});