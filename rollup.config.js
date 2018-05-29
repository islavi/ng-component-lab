export default {
  input: './release/index.js',
  output: {
      name: 'ng-component-lab',
      file: './release/bundles/ng2-component-lab.umd.js',
      format: 'umd',
      exports: 'named',
      moduleName: 'ngComponentLab'
  },
  external: [
      '@angular/core',
      '@angular/common',
      '@angular/common/http',
      '@angular/upgrade/static',
      '@angular/forms',
      '@angular/platform-browser',
      '@angular/http', 
      '@rxjs/add/operator/debounceTime',
      'rxjs/Subject',
      'rxjs/add/operator/debounceTime',
      'rxjs/add/operator/map',
      'rxjs/BehaviorSubject',
      'rxjs/Subject',
      'lodash'
  ],
  onwarn: function(warning) {
    // Skip certain warnings

    // should intercept ... but doesn't in some rollup versions
    if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }

    console.warn( warning.code );

    // console.warn everything else
    console.warn( "israel" + JSON.stringify(warning)); // warning.message );
  }
}
