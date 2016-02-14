describe('Slug service', function () {
    var slugService;

    beforeEach(module('slug'));

    beforeEach(inject(function (_slugService_) {
        slugService = _slugService_;
    }));

    it('should define slug service', function () {
        expect(slugService).toBeDefined();
    });

    it('should generate slug that replaces spaces with dashes', function () {
        var inputString = 'replace spaces with dashes';

        expect(slugService.generateSlug(inputString)).toEqual('replace-spaces-with-dashes');
    });

    it('should generate slug that replace ampersands with and', function () {
        var inputString = 'replace & with and';

        expect(slugService.generateSlug(inputString)).toEqual('replace-and-with-and');
    });

    it('should generate slug with no trailing dashes', function () {
        var inputString = 'No trailing dashes-';

        expect(slugService.generateSlug(inputString)).toEqual('no-trailing-dashes');
    });
});